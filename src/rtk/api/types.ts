interface ISignUpBody {
  name: string;
  login: string;
  password: string;
}

interface ISignInBody {
  login: string;
  password: string;
}

interface ISignUpResponse {
  id: string;
  name: string;
  login: string;
}

interface ISignInResponse {
  token: string;
}

interface ICreateBoardBody {
  title: string;
  description: string;
}

interface IUpdateBoardBody extends ICreateBoardBody {
  sharedWith: Array<string>;
}

interface ICreateTaskBody extends ICreateBoardBody {
  userId: string;
}

interface IBoardFaceDTO {
  userId: string;
  id: string;
  title: string;
  description: string;
  sharedWith: Array<ISharedUser>;
}

interface IFile {
  filename: string;
  fileSize: number;
}

interface ITask {
  title: string;
  order: number;
  description: string;
  userId: string;
  id: string;
  files: Array<IFile>;
}

interface ITaskUpdate {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks: Array<ITask>;
}

type IColumnUpdate = Omit<IColumn, 'tasks'>;

interface IBoardDTO extends IBoardFaceDTO {
  columns: Array<IColumn>;
}

interface ISharedUser {
  id: string;
  login: string;
}

interface IServerError {
  status: number;
  data: {
    message: string;
    statusCode: number;
  };
}

export type {
  ISignInBody,
  ISignUpBody,
  ISignInResponse,
  ISignUpResponse,
  ICreateBoardBody,
  IUpdateBoardBody,
  IBoardFaceDTO,
  IFile,
  ITask,
  ITaskUpdate,
  IColumn,
  IColumnUpdate,
  IBoardDTO,
  ICreateTaskBody,
  IServerError,
};
