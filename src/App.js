import React, { Component } from 'react';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      studentToEdit: {
        id: '',
        fullName: '',
        phone: '',
        email: '',
      },
    };
  }

  handleAddStudent = (student) => {
    this.setState({ students: [...this.state.students, student] });
  };

  handleDeleteStudent = (id) => {
    window.confirm(`Xóa sinh viên có mã sinh viên là ${id}?`) &&
      this.setState({
        students: this.state.students.filter((s) => s.id !== id),
      });
  };

  handleLoadStudentToEdit = (id) => {
    this.setState({
      studentToEdit: this.state.students.find((s) => s.id === id),
    });
  };

  handleClearStudentToEdit = () => {
    this.setState({
      studentToEdit: {
        id: '',
        fullName: '',
        phone: '',
        email: '',
      },
    });
  };

  handleUpdateStudent = (student) => {
    this.setState({
      students: this.state.students.map((s) =>
        s.id === student.id ? student : s
      ),
    });
  };

  render() {
    return (
      <div>
        <StudentForm
          students={this.state.students}
          studentToEdit={this.state.studentToEdit}
          handleAddStudent={this.handleAddStudent}
          handleClearStudentToEdit={this.handleClearStudentToEdit}
          handleUpdateStudent={this.handleUpdateStudent}
        />
        <StudentTable
          students={this.state.students}
          handleDeleteStudent={this.handleDeleteStudent}
          handleLoadStudentToEdit={this.handleLoadStudentToEdit}
        />
      </div>
    );
  }
}
