import * as React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TablePagination,
  Stack,
  Modal,
  Backdrop,
  Fade,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddContact from "./AddContact";

const API_ENDPOINT = "http://localhost:3000/contacts/";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const headCells = [
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "company", label: "Company" },
  { id: "jobTitle", label: "Job Title" },
  { id: "actions", label: "Actions" },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order === "asc" ? "asc" : "desc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

export default function EnhancedTable() {
  const [rows, setRows] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("lastName");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalContacts, setTotalContacts] = React.useState(0);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [currentRow, setCurrentRow] = React.useState(null);

  const fetchContacts = async (sortField, sortOrder, page, limit) => {
    try {
      const response = await axios.get(API_ENDPOINT, {
        params: {
          sortField,
          sortOrder: sortOrder === "asc" ? 1 : -1,
          page: page + 1,
          limit,
        },
      });
      const { data, totalContacts } = response.data;
      setRows(data);
      setTotalContacts(totalContacts);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };

  React.useEffect(() => {
    fetchContacts(orderBy, order, page, rowsPerPage);
  }, [order, orderBy, page, rowsPerPage]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (row) => {
    setCurrentRow(row);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setCurrentRow(null);
  };

  const handleDeleteClick = (row) => {
    setCurrentRow(row);
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
    setCurrentRow(null);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("currentRow", currentRow);
      await axios.put(`${API_ENDPOINT}${currentRow._id}`, currentRow);
      fetchContacts(orderBy, order, page, rowsPerPage);
      handleEditClose();
    } catch (error) {
      console.error("Failed to update contact:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentRow((prevRow) => ({ ...prevRow, [name]: value }));
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${API_ENDPOINT}${currentRow._id}`);
      fetchContacts(orderBy, order, page, rowsPerPage);
      handleDeleteClose();
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  return (
    <Box sx={{ width: "100%", m: 2 }}>
      <AddContact sx={{ width: "100%" }} fetchContacts={fetchContacts} />
      <Paper sx={{ width: "100%", m: 2 }}>
        <TableContainer>
          <Table>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.company}</TableCell>
                  <TableCell>{row.jobTitle}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <EditIcon
                        onClick={() => handleEditClick(row)}
                        color="primary"
                      />
                      <DeleteIcon
                        onClick={() => handleDeleteClick(row)}
                        color="error"
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalContacts}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Edit Modal */}
      <Modal
        open={openEdit}
        onClose={handleEditClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={openEdit}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Edit Contact
            </Typography>
            <form onSubmit={handleFormSubmit}>
              {/* Form Fields */}
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={currentRow?.firstName || ""}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={currentRow?.lastName || ""}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={currentRow?.email || ""}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={currentRow?.phone || ""}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={currentRow?.company || ""}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Job Title"
                name="jobTitle"
                value={currentRow?.jobTitle || ""}
                onChange={handleInputChange}
                margin="normal"
              />
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Submit
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={openDelete}
        onClose={handleDeleteClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={openDelete}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Are you sure you want to delete this contact permanently?
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteConfirm}
              >
                Yes
              </Button>
              <Button variant="outlined" onClick={handleDeleteClose}>
                Cancel
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
