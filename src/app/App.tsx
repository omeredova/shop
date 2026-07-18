import './App.css';
import { Header } from '@/modules';
import { ShopRouter } from '@/app';

export const App = () => {

  return (
    <div className="container">
      <Header/>
      <ShopRouter/>
    </div>
  );
};