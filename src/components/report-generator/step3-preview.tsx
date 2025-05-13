
"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DataRow {
  id: string;
  timestamp: string;
  machine: string;
  parameter: string;
  value: number | string;
  unit: string;
  included: boolean;
}

const mockData: DataRow[] = Array.from({ length: 50 }, (_, i) => ({
  id: `data-${i}`,
  timestamp: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
  machine: `MACHINE-${String(Math.ceil(Math.random()*5)).padStart(3, '0')}`,
  parameter: `Param ${String.fromCharCode(65 + (i % 5))}`,
  value: (Math.random() * 100).toFixed(2),
  unit: i % 2 === 0 ? "°C" : "PSI",
  included: true,
}));

type SortKey = keyof Omit<DataRow, 'included' | 'id'>;

export function ReportStep3Preview() {
  const [data, setData] = React.useState<DataRow[]>(mockData);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState<{ key: SortKey; direction: 'ascending' | 'descending' } | null>(null);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleIncludeToggle = (id: string) => {
    setData(prevData =>
      prevData.map(row =>
        row.id === id ? { ...row, included: !row.included } : row
      )
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setData(prevData => prevData.map(row => ({ ...row, included: checked })));
  };

  const filteredData = React.useMemo(() => {
    let searchableData = data;
    if (searchTerm) {
      searchableData = data.filter(row =>
        Object.values(row).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (sortConfig !== null) {
      searchableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return searchableData;
  }, [data, searchTerm, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
            placeholder="Search data..."
            value={searchTerm}
            onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
            }}
            className="pl-10"
            />
        </div>
        {/* TODO: Add toggles for data categories if needed */}
      </div>
      
      <ScrollArea className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={data.every(row => row.included)}
                  onCheckedChange={(checked) => handleSelectAll(Boolean(checked))}
                  aria-label="Select all rows"
                />
              </TableHead>
              <TableHead onClick={() => requestSort('timestamp')} className="cursor-pointer hover:bg-muted">
                Timestamp <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => requestSort('machine')} className="cursor-pointer hover:bg-muted">
                Machine <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => requestSort('parameter')} className="cursor-pointer hover:bg-muted">
                Parameter <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => requestSort('value')} className="cursor-pointer hover:bg-muted">
                Value <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => requestSort('unit')} className="cursor-pointer hover:bg-muted">
                Unit <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id} data-state={row.included ? 'selected' : undefined}>
                <TableCell>
                  <Checkbox
                    checked={row.included}
                    onCheckedChange={() => handleIncludeToggle(row.id)}
                    aria-label={`Select row ${row.id}`}
                  />
                </TableCell>
                <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
                <TableCell>{row.machine}</TableCell>
                <TableCell>{row.parameter}</TableCell>
                <TableCell>{row.value}</TableCell>
                <TableCell>{row.unit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
       {filteredData.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No data matches your criteria or is available for preview.</p>
      )}
      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev -1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
