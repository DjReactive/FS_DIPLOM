import './resources/css/normalize.css';
import './resources/css/style.css';
import './resources/css/loader.css';
import { observer } from 'mobx-react-lite'
import { Routes, Route } from 'react-router-dom';
import { RouterTree } from './control/router/RouterTree';
import AuthProvider from './control/lib/AuthProvider'
import ProtectRoute from './control/lib/ProtectRoute'

const App = observer(() => {
  return (
    <AuthProvider>
      <Routes>
        { RouterTree.map(acc => acc.routes.map(o =>
            <Route path={o.dir} key={o.dir}
              element={<ProtectRoute access={acc.access} data={o} />}
            />
        ))}
      </Routes>
    </AuthProvider>
  );
});

export default App;
