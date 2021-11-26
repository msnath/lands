import axios from "axios";
import { config } from "dotenv";
import { Collection, Document, MongoClient } from "mongodb";

config();

const stg = new MongoClient(process.env.MONGO_DB_URI_STG ?? "");
const prd = new MongoClient(process.env.MONGO_DB_URI_PRD ?? "");

const addFeeWaivers = async (
  documents: Collection<Document>,
  subdomain: string
) => {
  const promises: Promise<any>[] = [];
  const docs = await documents.find().toArray();
  for (const doc of docs) {
    const res = await axios.post<any>(
      `https://${subdomain}.lockandstock.app/api/search/courses`,
      {
        format: ["fee_waiver_details"],
        filter: {
          institutes: { ids: [doc.institute_id] },
          courses: { names: [doc.course_name] },
        },
      }
    );

    const institute_id = res.data.results[0].institute.id;
    const institute_name = res.data.results[0].institute.name;
    const course_id = res.data.results[0].course.id;
    const course_name = res.data.results[0].course.name;
    const fee_waiver_id = res.data.results[0].fee_waiver.fee_waivers[0].id;
    const fee_waiver_name = res.data.results[0].fee_waiver.fee_waivers[0].name;
    console.log(doc._id, doc.email);
    console.log(institute_id, institute_name);
    console.log(course_id, course_name);
    console.log(fee_waiver_id, fee_waiver_name);
    console.log();

    const promise = documents.findOneAndUpdate(
      { email: doc.email, institute_id, course_name },
      { $set: { course_id, fee_waiver_id, fee_waiver_name } }
    );

    promises.push(promise);
  }

  await Promise.all(promises);
};

const run = async () => {
  await stg.connect();
  await prd.connect();

  const Staging = { applications: stg.db().collection("applications") };
  const Production = { applications: prd.db().collection("applications") };

  await addFeeWaivers(Staging.applications, "ucpstaging");
  await addFeeWaivers(Production.applications, "ucp");
};

run().then(() => process.exit());
