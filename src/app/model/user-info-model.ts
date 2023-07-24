// ignore_for_file: unnecessary_new, prefer_collection_literals, non_constant_identifier_names

export class UserInfo {
  constructor(
    public id: number = 0,
    public parentId: number = 0,
    public kind: string = "",
    public email: string = "",
    public password: string = "",
    public name: string = "",
    public contactNo: string = "",
    public latitude: number = 0,
    public longitude: number = 0,
    public activity_status: string = "",
    public duty_status: string = "",
    public teamLeader: string = "",
    public membership: string = "",
  ) {
    return {
      id,
      parentId,
      kind,
      email,
      password,
      name,
      contactNo,
      latitude,
      longitude,
      activity_status,
      duty_status,
      teamLeader,
      membership,
    }
  }
}