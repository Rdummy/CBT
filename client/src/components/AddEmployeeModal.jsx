import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  TextField,
  FormGroup,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import "../assets/styles/ExamRoutes.css";
import { CSSTransition } from 'react-transition-group';

// Ensure TransitionComponent is defined correctly
const TransitionComponent = React.forwardRef((props, ref) => (
    <CSSTransition
      in={props.in}
      timeout={500}
      classNames="my-animation"
      unmountOnExit
      nodeRef={ref}
      {...props}
    >
      {props.children}
    </CSSTransition>
  ));
  

  const AddEmployeeModal = ({ isOpen, handleClose, departments }) => {
    const [employeeDetails, setEmployeeDetails] = useState({
      name: '',
      email: '',
      role: '',
      department: '',
      newDepartment: ''
    });
  
    useEffect(() => {
      if (!isOpen) {
        setEmployeeDetails({
          name: '',
          email: '',
          role: '',
          department: '',
          newDepartment: ''
        });
      }
    }, [isOpen]);
  

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setEmployeeDetails(prevDetails => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    const submissionData = {
      ...employeeDetails,
      department: employeeDetails.newDepartment || employeeDetails.department,
    };
    // Optionally remove the newDepartment key if not needed for submission
    delete submissionData.newDepartment;

    console.log('Submission Data:', submissionData);
    // Here, integrate with your backend to create the employee
    // await axios.post('/api/employees', submissionData);
    handleClose();
  };

  const isFormValid = employeeDetails.name && employeeDetails.email && employeeDetails.role && (employeeDetails.department || employeeDetails.newDepartment);

  return (
    <Dialog
    open={isOpen}
    onClose={handleClose}
    TransitionComponent={TransitionComponent} // Use the custom TransitionComponent for animations
  >
    <DialogTitle>Add New Employee</DialogTitle>
    <DialogContent>
      <FormGroup>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            name="name"
            value={employeeDetails.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            name="email"
            value={employeeDetails.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Role"
            type="text"
            fullWidth
            variant="outlined"
            name="role"
            value={employeeDetails.role}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
          Department
            <Select
              label="Department"
              name="department"
              value={employeeDetails.department}
              onChange={handleChange}
              displayEmpty
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>{dept}</MenuItem>
              ))}
              <MenuItem value="">-- Add New --</MenuItem>
            </Select>
          </FormControl>
          {employeeDetails.department === '' && (
            <TextField
              margin="dense"
              label="New Department"
              type="text"
              fullWidth
              variant="outlined"
              name="newDepartment"
              value={employeeDetails.newDepartment}
              onChange={handleChange}
            />
          )}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} className="cancelButton">Cancel</Button>
        <Button onClick={handleSave} disabled={!isFormValid} className="saveButton">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployeeModal;
