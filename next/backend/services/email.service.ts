import Emailer from "#/configs/emailer.config";
import Env from "#/configs/env.config";
import Logger from "#/configs/logger.config";
import { TReduxFormPage } from "$/types/form.type";
import { SendMailOptions } from "nodemailer";

const from = Env.EMAIL_FROM;
const cc = Env.EMAIL_TO;

const EmailService = {
  notification: async (
    type: "Application" | "Enquiry",
    user_email: string,
    counsellor_email: string | null,
    app: { name: string; email: string },
    enq: { name: string; email: string },
    institute_source_name: string,
    institute_name: string,
    application_source: string,
    preAppPage: TReduxFormPage
  ) => {
    try {
      const subject = `${application_source}: ${type} Submitted to ${institute_name} by ${user_email}`;

      let html = `
          <p>A new ${type.toLowerCase()} was submitted on <b>${application_source}</b>.</p>
          ${
            type === "Application"
              ? `<p>Full application details can be found on UCP.</p>`
              : ``
          }
          <p>Please find the details below:</p>
          <br />
          <hr />
          <h4 style="font-size: 1.25rem;">General Information</b></h4>
          <p><b>University :</b> ${institute_name}</p>
          <p><b>Application Counsellor :</b> ${app.name} - ${app.email}</p>
          <p><b>Enquiry Counsellor :</b> ${enq.name} - ${enq.email}</p>
          <p><b>University Source :</b> ${institute_source_name}</p>
          <br />
        `;

      for (const section of preAppPage.sections) {
        html += `<hr /><h4 style="font-size: 1.25rem;"><b>${section.name}</b></h4>`;

        for (const row of section.fields) {
          for (const field of row) {
            html += `
              <p><b>${field.name}: </b> ${field.values.join(", ")}</p>`;

            for (const condition of field.conditions) {
              html += `
              <p><b>${condition.name}: </b> ${condition.values.join(", ")}</p>`;
            }
          }
        }

        html += `<br />`;
      }

      const mailOptions: SendMailOptions = {
        from,
        to: counsellor_email ?? "",
        cc,
        subject,
        html,
      };

      const res = await Emailer.transporter.sendMail(mailOptions);
      Logger.debug(res);
    } catch (err) {
      Logger.error("Notification Email Error");
      Logger.error(err);
    }
  },
};

export default EmailService;
