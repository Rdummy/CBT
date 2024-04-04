import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  TextField,
  FormGroup,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';

const AddEmployeeModal = ({ isOpen, handleClose, departments, accessFeatures, updateAccessFeatures }) => {
  const [employeeDetails, setEmployeeDetails] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    isCoAdmin: false,
    newDepartment: ''
  });
  const [showCoAdminFeatures, setShowCoAdminFeatures] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset form and hide Co-Admin Features when the modal is closed
      setEmployeeDetails({
        name: '',
        email: '',
        role: '',
        department: '',
        isCoAdmin: false,
        newDepartment: ''
      });
      setShowCoAdminFeatures(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setEmployeeDetails(prevDetails => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === "isCoAdmin") {
      setShowCoAdminFeatures(checked);
    }
  };

  const handleSave = async () => {
    const submissionData = {
      ...employeeDetails,
      department: employeeDetails.newDepartment || employeeDetails.department,
      // Include permission data if isCoAdmin is true
      ...(employeeDetails.isCoAdmin && { permissions: accessFeatures }),
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
    <Dialog open={isOpen} onClose={handleClose}>
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
          <FormControlLabel
            control={
              <Switch
                checked={employeeDetails.isCoAdmin}
                onChange={handleChange}
                name="isCoAdmin"
              />
            }
            label="Set as Co-Admin"
          />
        {showCoAdminFeatures && (
  <React.Fragment>
    <FormControlLabel
      control={
        <Switch
          checked={accessFeatures?.allowEditContent}
          onChange={(event) => updateAccessFeatures({
            ...accessFeatures,
            allowEditContent: event.target.checked,
          })}
        />
      }
      label="Allow edit content"
    />
              <FormControlLabel
                control={
                  <Switch
                    checked={accessFeatures.allowDeleteExam}
                    onChange={(event) => updateAccessFeatures({
                      ...accessFeatures,
                      allowDeleteExam: event.target.checked,
                    })}
                  />
                }
                label="Allow delete exam"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={accessFeatures.allowAddCreateExam}
                    onChange={(event) => updateAccessFeatures({
                      ...accessFeatures,
                      allowAddCreateExam: event.target.checked,
                    })}
                  />
                }
                label="Allow add/create exam"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={accessFeatures.allowCreateContent}
                    onChange={(event) => updateAccessFeatures({
                      ...accessFeatures,
                      allowCreateContent: event.target.checked,
                    })}
                  />
                }
                label="Allow create content"
              />
            </React.Fragment>
          )}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} disabled={!isFormValid}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployeeModal;
