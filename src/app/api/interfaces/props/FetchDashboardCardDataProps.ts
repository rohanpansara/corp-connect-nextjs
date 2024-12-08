import { Dispatch, SetStateAction } from "react";

interface LeaveDetailsCard {
  title: string;
  value: string;
  description: string;
}

interface ShiftDetailsCard {
  title: string;
  value: string;
  description: string;
}

interface MonthlyAttendanceCard {
  title: string;
  value: string;
  description: string;
  totalValue: string;
  absent: boolean;
}

export interface CardsData {
  leaveDetailsCard: LeaveDetailsCard;
  shiftDetailsCard: ShiftDetailsCard;
  monthlyAttendanceCard: MonthlyAttendanceCard;
}

export interface FetchCardsDataProps {
  setCardsData: Dispatch<SetStateAction<CardsData | null>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  onNavigate: (path: string) => void;
}
