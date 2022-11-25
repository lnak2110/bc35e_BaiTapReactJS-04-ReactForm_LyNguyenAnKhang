import React, { Component } from 'react';
import StudentRow from './StudentRow';

export default class StudentTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
    };
  }

  handleSearchTextChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  handleSearch = (students) => {
    return students.filter((student) => {
      const fullNameRemoveAccents = this.removeAccents(
        student.fullName.toLowerCase()
      );
      const searchTextRemoveAccents = this.removeAccents(
        this.state.searchText.toLowerCase()
      );

      return fullNameRemoveAccents.includes(searchTextRemoveAccents);
    });
  };

  removeAccents(str) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  }

  render() {
    const { students, handleDeleteStudent, handleLoadStudentToEdit } =
      this.props;

    return (
      <div>
        <div className="d-flex justify-content-center mb-3">
          <input
            className="form-control"
            style={{ width: '50%' }}
            type="text"
            placeholder="Search student name..."
            value={this.state.searchText}
            onChange={this.handleSearchTextChange}
          />
        </div>
        <table className="table">
          <thead>
            <tr className="table-dark p-3">
              <th>Mã SV</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.handleSearch(students).map((student) => (
              <StudentRow
                key={student.id}
                student={student}
                handleDeleteStudent={handleDeleteStudent}
                handleLoadStudentToEdit={handleLoadStudentToEdit}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
