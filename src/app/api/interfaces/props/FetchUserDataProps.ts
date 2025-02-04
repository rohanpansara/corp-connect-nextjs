export interface FetchUsersDataProps {
  setUsersData: React.Dispatch<React.SetStateAction<any[]>>;
  setNoResultFound: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onNavigate: (path: string) => void;
  filter?: string;
}
