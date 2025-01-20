export type SelectedReport = {
  date: string;
  startTime?: string;
  endTime?: string;
};

export type NewReport = {
  date: string;
  startTime: string;
  endTime?: string;
  reporterId: string;
};

export type Report = {
  date: string;
  startTime: string;
  endTime: string;
  reporterId: string;
  firstName: string;
  lastName: string;
  managerId: string;
  closed: boolean;
};

export type ReportStatus = {
  status: string;
  employeeId: string;
  date: string;
};
