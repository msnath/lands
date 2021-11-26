import MongoDB from "#/configs/mongoose.config";
import MySQL from "#/configs/mysql.config";
import AllMiddleware from "#/middlewares/all.middleware";
import { Application } from "#/models/applications.model";
import EmailService from "#/services/email.service";
import { ApiHandler, ApiMethod, ApiResponse } from "$/types/api.type";
import { newOffsetDate } from "@/helpers/date.helper";

const SubmitApplicationForm: ApiHandler = async (req, res, next) => {
  try {
    const {
      application_source,
      email,
      institute_id,
      institute_name,
      course_id,
      course_name,
      fee_waiver_id,
      fee_waiver_name,
      level_name,
      pre_app_pages,
      pages,
      completed,
      notify,
    } = req.body;

    // insert / update MongoDB document
    await MongoDB.connect();

    const result = await Application.findOneAndUpdate(
      { email, institute_id, course_id },
      {
        application_source,
        email,
        institute_id,
        institute_name,
        course_id,
        course_name,
        fee_waiver_id,
        fee_waiver_name,
        level_name,
        pre_app_pages,
        pages,
      },
      { upsert: true, new: true }
    );

    const _id = result?._id?.toString() ?? null;

    await MongoDB.disconnect();

    // insert / update MySQL database
    const query1 = `
      INSERT INTO Applications (
        application_source_id,
        email,
        course_id,
        enquiry_submitted, application_started, application_submitted,
        application_object_id
      ) VALUES (
        (
          SELECT application_source_id FROM ApplicationSource
          WHERE application_source_name = ?
        ),
        ?,
        (
          SELECT course_id FROM ucp_db_staging.Course
          WHERE institute_id = ? AND course_name = ?
        ),
        ?, ?, ?,
        ?
      )
      ON DUPLICATE KEY UPDATE
        application_source_id = (
          SELECT application_source_id FROM ApplicationSource
          WHERE application_source_name = ?
        ),
        application_started = CASE
          WHEN application_started IS NULL
          THEN ? ELSE application_started
          END,
        application_submitted = ?,
        application_object_id = ?`;

    const date = newOffsetDate();
    const values1 = [
      application_source,
      email,
      institute_id,
      course_name,
      pre_app_pages.length > 0 && notify ? date : null,
      pages.length > 0 ? date : null,
      pages.length > 0 && completed ? date : null,
      _id,

      application_source,
      pages.length > 0 ? date : null,
      pages.length > 0 && completed ? date : null,
      _id,
    ];

    await MySQL.pool.query(query1, values1);

    // send email to admissions team
    const query2 = `
      SELECT
      US.source_name,
      C.email AS counsellor_email,
      (
        SELECT JSON_OBJECT('email', C2.email, 'name', CONCAT(C2.fname,' ',C2.lname))
        FROM ucp_db_staging.Counsellor C2 WHERE C2.counsellor_id = I.application_counsellor_id
      ) AS application_counsellor,
      (
        SELECT JSON_OBJECT('email', C3.email, 'name', CONCAT(C3.fname,' ',C3.lname))
        FROM ucp_db_staging.Counsellor C3 WHERE C3.counsellor_id = I.enquiry_counsellor_id
      ) AS enquiry_counsellor
      FROM ucp_db_staging.Institute I
      INNER JOIN ucp_db_staging.UniSource US ON I.source_id = US.source_id
      LEFT JOIN ucp_db_staging.Counsellor C ON ${
        pages.length === 0
          ? `I.enquiry_counsellor_id`
          : `I.application_counsellor_id`
      } = C.counsellor_id
      WHERE I.institute_id = ?`;
    const values2 = [+institute_id];
    const [queryResult] = await MySQL.pool.query(query2, values2);

    const obj = ((queryResult ?? []) as any[])[0];

    if (notify) {
      EmailService.notification(
        pages.length === 0 ? "Enquiry" : "Application",
        email ?? "",
        obj?.counsellor_email ?? "",
        {
          name: obj?.application_counsellor?.name ?? "",
          email: obj?.application_counsellor?.email ?? "",
        },
        {
          name: obj?.enquiry_counsellor?.name ?? "",
          email: obj?.enquiry_counsellor?.email ?? "",
        },
        obj.source_name ?? "",
        institute_name,
        application_source,
        pre_app_pages[0]
      );
    }

    const response = ApiResponse.success();
    res.json(response.json);
    next();
  } catch (error) {
    next(error);
  }
};

export default AllMiddleware.basic({
  handler: SubmitApplicationForm,
  method: ApiMethod.POST,
});
