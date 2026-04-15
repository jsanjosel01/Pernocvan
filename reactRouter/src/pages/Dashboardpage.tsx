import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Ene', ventas: 400 },
  { name: 'Feb', ventas: 300 },
  { name: 'Mar', ventas: 200 },
  { name: 'Abr', ventas: 278 },
];

export default function Dashboardpage() {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-2">Ventas Mensuales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="ventas" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
