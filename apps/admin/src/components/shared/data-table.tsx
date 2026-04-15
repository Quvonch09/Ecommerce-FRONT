export const DataTable = ({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode;
}) => (
  <div className="overflow-hidden rounded-[24px] border border-slate-100">
    <table className="min-w-full divide-y divide-slate-100">
      <thead className="bg-slate-50">
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.2em] text-slate-500"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 bg-white">{rows}</tbody>
    </table>
  </div>
);
