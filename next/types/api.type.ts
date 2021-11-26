import { NextApiRequest, NextApiResponse } from "next";
import { RequestHandler } from "next-connect";
import multiparty from "multiparty";

export interface ApiResponseJSON<T> {
  success: boolean;
  response: T | null;
}

export class ApiResponse<T> {
  private success: boolean;
  private response: T | null;

  private constructor(success: boolean, response: T | null) {
    this.success = success;
    this.response = response;
  }

  static success<T>(response?: T): ApiResponse<T> {
    return new ApiResponse<T>(true, response ?? null);
  }

  static failure<T>(response?: T): ApiResponse<T> {
    return new ApiResponse<T>(false, response ?? null);
  }

  get json(): ApiResponseJSON<T> {
    return { success: this.success, response: this.response };
  }
}

type NextApiRequestWithFiles = NextApiRequest & {
  files?: { [key: string]: multiparty.File[] };
};

export type ApiHandler = RequestHandler<
  NextApiRequestWithFiles,
  NextApiResponse
>;

export enum ApiMethod {
  GET,
  POST,
  PUT,
  DELETE,
  PATCH,
}

export type TNextApiFileUpload = { id: string; url: string };
