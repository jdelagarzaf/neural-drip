import Mapa from './Mapa';
import Input from './Input';

export default function Index() {
  return (
    <div className="flex bg-zinc-800 h-full">
        <Input />
        <Mapa />
    </div>
  );
}
