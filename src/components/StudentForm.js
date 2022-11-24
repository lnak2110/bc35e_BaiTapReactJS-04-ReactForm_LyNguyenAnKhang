import React, { Component } from 'react';

export default class StudentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: {
        id: '',
        fullName: '',
        phone: '',
        email: '',
      },
      errors: {
        id: '',
        fullName: '',
        phone: '',
        email: '',
      },
      isFormValid: false,
      isEditing: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { students, studentToEdit, handleClearStudentToEdit } = this.props;

    if (studentToEdit.id !== '') {
      this.setState({
        errors: {
          id: '',
          fullName: '',
          phone: '',
          email: '',
        },
        isFormValid: true,
      });
      this.setState({ student: studentToEdit, isEditing: true });
      handleClearStudentToEdit();
    }

    // Clear form and errors if the user is editing a student and deleting that same student.
    if (prevProps.students.length !== students.length) {
      if (this.state.student.id) {
        !students.some((s) => s.id === this.state.student.id) &&
          this.handleCancelEdit();
      }
    }
  }

  checkValid = () => {
    const { student, errors } = this.state;

    for (let key in errors) {
      if (errors[key] !== '' || student[key] === '') {
        return false;
      }
    }

    return true;
  };

  handleInputChange = (e) => {
    const { name: inputField, value: inputValue } = e.target;

    this.setState({
      student: { ...this.state.student, [inputField]: inputValue },
    });

    let errorMessage = '';

    if (inputValue.trim() === '') {
      const displayField = {
        id: 'ID',
        fullName: 'Full name',
        phone: 'Phone number',
        email: 'Email',
      };
      errorMessage = `${displayField[inputField]} cannot be blank!`;
    } else {
      if (inputField === 'id') {
        this.props.students.find((s) => s.id === inputValue) &&
          (errorMessage = 'ID already exists!');
      }

      if (inputField === 'fullName') {
        let regex =
          /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựýỳỵỷỹ\\s]+$/;

        regex.test(inputValue) || (errorMessage = 'Invalid name!');
      }

      if (inputField === 'phone') {
        let regex = /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/;

        regex.test(inputValue) || (errorMessage = 'Invalid phone number!');
      }

      if (inputField === 'email') {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        regex.test(inputValue) || (errorMessage = 'Invalid email!');
      }
    }

    this.setState(
      {
        errors: { ...this.state.errors, [inputField]: errorMessage },
      },
      () => this.setState({ isFormValid: this.checkValid() })
    );
  };

  handleSubmitForm = (e) => {
    e.preventDefault();

    if (!this.state.isFormValid) {
      return;
    }

    this.props.handleAddStudent(this.state.student);
    this.setState({
      student: {
        id: '',
        fullName: '',
        phone: '',
        email: '',
      },
      isFormValid: false,
    });
  };

  handleCancelEdit = () => {
    this.props.handleClearStudentToEdit();
    this.setState({
      student: {
        id: '',
        fullName: '',
        phone: '',
        email: '',
      },
      errors: {
        id: '',
        fullName: '',
        phone: '',
        email: '',
      },
      isFormValid: false,
      isEditing: false,
    });
  };

  render() {
    const { handleUpdateStudent } = this.props;

    return (
      <div>
        <h1 className="bg-dark text-white p-3">Thông tin sinh viên</h1>
        <form onSubmit={this.handleSubmitForm}>
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
                  value={this.state.student.id}
                  onChange={this.handleInputChange}
                  disabled={this.state.isEditing}
                />
                {this.state.errors.id && (
                  <p className="alert alert-danger p-2">
                    {this.state.errors.id}
                  </p>
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
                  value={this.state.student.fullName}
                  onChange={this.handleInputChange}
                />
                {this.state.errors.fullName && (
                  <p className="alert alert-danger p-2">
                    {this.state.errors.fullName}
                  </p>
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
                  value={this.state.student.phone}
                  onChange={this.handleInputChange}
                />
                {this.state.errors.phone && (
                  <p className="alert alert-danger p-2">
                    {this.state.errors.phone}
                  </p>
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
                  value={this.state.student.email}
                  onChange={this.handleInputChange}
                />
                {this.state.errors.email && (
                  <p className="alert alert-danger p-2">
                    {this.state.errors.email}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="mx-4 my-3">
            <button
              className="btn btn-success"
              disabled={this.state.isEditing || !this.state.isFormValid}
            >
              Thêm sinh viên
            </button>
            {this.state.isEditing && (
              <>
                <button
                  className="btn btn-info ms-3"
                  onClick={() => {
                    if (!this.state.isFormValid) {
                      return;
                    }
                    handleUpdateStudent(this.state.student);
                    this.handleCancelEdit();
                  }}
                  disabled={!this.state.isFormValid}
                >
                  Cập nhật
                </button>
                <button
                  className="btn btn-warning mx-3"
                  onClick={this.handleCancelEdit}
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
