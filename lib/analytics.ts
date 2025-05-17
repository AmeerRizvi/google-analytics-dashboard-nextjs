import {google} from "googleapis";
import path from "path";

const keyFileName = process.env.GA_KEY_FILE!;

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(process.cwd(), keyFileName),
  scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
});

export const analyticsDataClient = google.analyticsdata({
  version: "v1beta",
  auth,
});

export const propertyId = process.env.NEXT_PUBLIC_GA_PROPERTY_ID!;
