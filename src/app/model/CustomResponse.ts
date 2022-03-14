import { Movil } from './movil';

export interface CustomResponse {
  timestamp: Date;
  statusCode: number;
  status: string;
  reason: string;
  message: string;
  developerMessage: string;
  data: { moviles: Content};
  error_message:any
}

export interface Content {
  content: Movil[];
  totalPages: number;
  totalElements: number;
  pageable:Pageable;
}

export interface Pageable{
    pageSize:number;
    pageNumber:number;
}
