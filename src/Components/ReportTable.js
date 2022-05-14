import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'date', label: 'תאריך', align: "center", minWidth: 100 },
  { id: 'course', label: 'קורס', align: "center", minWidth: 150 },
  {
    id: 'time',
    label: 'שעות',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'duration',
    label: 'משך התגבור',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'num',
    label: 'מספר סטודנטים',
    minWidth: 50,
    align: 'center',
  },
  {
    id: 'names',
    label: 'סטודנטים',
    minWidth: 200,
    align: 'center',
  },
];

function createData(date, course, time, duration, num, names) {
  return { date, course, time, duration, num, names };
}

const rows = [
  createData('12-05-2022', 'חשבון דיפרנציאלי ואינטגרלי', "08:15 - 09:45", "שעתיים", 3, "עמיחי, אוראל"),
  createData('12-05-2022', 'אלגברה לינארית', "08:15 - 09:45", "שעתיים", 5, "נתנאל, עמיחי, מנשה, אביב, חיים, נוגה"),
  createData('12-05-2022', 'מבני נתונים', "08:15 - 09:45", "שעתיים", 1, "אורן אביתר"),
  createData('12-05-2022', 'מבוא למדעי המחשב', "08:15 - 09:45", "שעתיים", 3, "עמיחי, אוראל"),
  createData('12-05-2022', 'אלגברה לינארית', "08:15 - 09:45", "שעתיים", 5, "נתנאל, עמיחי, מנשה, אביב, חיים, נוגה"),
  createData('12-05-2022', 'סמינריון בינה מלאכותית', "08:15 - 09:45", "שעתיים", 1, "אורן אביתר"),
  createData('12-05-2022', 'אלגוריתמים', "08:15 - 09:45", "שעתיים", 2, "גילה בר, מיכה שטיין"),
  createData('12-05-2022', 'חשבון דיפרנציאלי ואינטגרלי', "08:15 - 09:45", "שעתיים", 3, "עמיחי, אוראל"),
  createData('12-05-2022', 'אלגברה לינארית', "08:15 - 09:45", "שעתיים", 5, "נתנאל, עמיחי, מנשה, אביב, חיים, נוגה"),
  createData('12-05-2022', 'מבני נתונים', "08:15 - 09:45", "שעתיים", 1, "אורן אביתר"),
  createData('12-05-2022', 'מבוא למדעי המחשב', "08:15 - 09:45", "שעתיים", 3, "עמיחי, אוראל"),
  createData('12-05-2022', 'אלגברה לינארית', "08:15 - 09:45", "שעתיים", 5, "נתנאל, עמיחי, מנשה, אביב, חיים, נוגה"),
  createData('12-05-2022', 'סמינריון בינה מלאכותית', "08:15 - 09:45", "שעתיים", 1, "אורן אביתר"),
  createData('12-05-2022', 'אלגוריתמים', "08:15 - 09:45", "שעתיים", 2, "גילה בר, מיכה שטיין")
];

export default function ReportTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        labelRowsPerPage={rows.length + " תוצאות"}
        component="div"
        count={rows.length}
        labelDisplayedRows={() => { }}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
