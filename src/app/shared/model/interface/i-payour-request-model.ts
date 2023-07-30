export interface IPayoutRequestModel {
  id: string;
  member_id: string;
  member_name: string;
  gcash_number: string;
  amount: number;
  status: number;
  created_at: Date;
}
