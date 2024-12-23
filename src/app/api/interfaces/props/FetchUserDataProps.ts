export interface FetchUsersDataProps {
  setUsersData: React.Dispatch<React.SetStateAction<any[]>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onNavigate: (path: string) => void; // Callback function for navigation
}
