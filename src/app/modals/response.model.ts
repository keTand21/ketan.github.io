
export class ResponseModel {
  status: string;
  data: any | {
    rows: Array<any>,
    count: number
  };
  statusCode: number;
  message: string;
}
