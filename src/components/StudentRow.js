import React, { Component } from 'react';

export default class StudentRow extends Component {
  render() {
    const { student, handleDeleteStudent, handleLoadStudentToEdit } =
      this.props;

    return (
      <tr>
        <td>{student.id}</td>
        <td>{student.fullName}</td>
        <td>{student.phone}</td>
        <td>{student.email}</td>
        <td>
          <button
            className="btn btn-primary me-3"
            onClick={() => handleLoadStudentToEdit(student.id)}
          >
            Chỉnh sửa
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteStudent(student.id)}
          >
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}
