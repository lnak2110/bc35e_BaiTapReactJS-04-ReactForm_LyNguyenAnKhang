import React, { Component } from 'react';

export default class StudentForm extends Component {
  // Clear form and errors if the user is editing a student and deleting that same student.
  componentDidUpdate(prevProps, prevState) {
    const { students, student, handleCancelEdit } = this.props;

    if (prevProps.students.length !== students.length) {
      if (student.id) {
        !students.some((s) => s.id === student.id) && handleCancelEdit();
      }
    }
  }

  render() {
    const {
      student,
      errors,
      isFormValid,
      isEditing,
      handleInputChange,
      handleSubmitForm,
      handleUpdateStudent,
      handleCancelEdit,
    } = this.props;

    return (
      <div>
        <h1 className="bg-dark text-white p-3">Thông tin sinh viên</h1>
        <form onSubmit={handleSubmitForm}>
          <div className="row" style={{ width: '100%' }}>
            <div className="col-12 col-md-6">
              <div className="py-3 px-4">
                <label htmlFor="id" className="form-label">
                  Mã SV
                </label>
                <input
                  type="text"
                  name="id"
                  className="form-control"
                  value={student.id}
                  onChange={handleInputChange}
                  disabled={isEditing}
                />
                {errors.id && (
                  <p className="alert alert-danger p-2">{errors.id}</p>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="py-3 px-4">
                <label htmlFor="fullName" className="form-label">
                  Họ tên
                </label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  value={student.fullName}
                  onChange={handleInputChange}
                />
                {errors.fullName && (
                  <p className="alert alert-danger p-2">{errors.fullName}</p>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="py-3 px-4">
                <label htmlFor="phone" className="form-label">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={student.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && (
                  <p className="alert alert-danger p-2">{errors.phone}</p>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="py-3 px-4">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={student.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className="alert alert-danger p-2">{errors.email}</p>
                )}
              </div>
            </div>
          </div>
          <div className="mx-4 my-3">
            <button
              className="btn btn-success"
              disabled={isEditing || !isFormValid}
            >
              Thêm sinh viên
            </button>
            {isEditing && (
              <>
                <button
                  className="btn btn-info ms-3"
                  onClick={() => {
                    if (!isFormValid) {
                      return;
                    }
                    handleUpdateStudent(student.id);
                  }}
                  disabled={!isFormValid}
                >
                  Cập nhật
                </button>
                <button
                  className="btn btn-warning mx-3"
                  onClick={handleCancelEdit}
                >
                  Hủy
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    );
  }
}
