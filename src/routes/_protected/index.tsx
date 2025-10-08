import { createFileRoute } from '@tanstack/react-router'
import ProtectedRoutes from '../../components/ProtectedRoutes';


export const Route = createFileRoute('/_protected/')({
  component: () => {
    <ProtectedRoutes allowGuest>
      <RouteComponent />
    </ProtectedRoutes>;
  }
});

function RouteComponent() {
  return <div>Hello "/_protected/index"!</div>
}
