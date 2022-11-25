import React, { Component } from 'react';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
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

  handleAddStudent = () => {
    this.setState({ students: [...this.state.students, this.state.student] });
  };

  handleDeleteStudent = (id) => {
    window.confirm(`Xóa sinh viên có mã sinh viên là ${id}?`) &&
      this.setState({
        students: this.state.students.filter((s) => s.id !== id),
      });
  };

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
        this.state.students.find((s) => s.id === inputValue) &&
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

    this.handleAddStudent();
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

  handleLoadStudentToEdit = (id) => {
    this.setState({ student: this.state.students.find((s) => s.id === id) });
    this.setState({ isEditing: true });
    this.setState({
      errors: {
        id: '',
        fullName: '',
        phone: '',
        email: '',
      },
      isFormValid: true,
    });
  };

  handleCancelEdit = () => {
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

  handleUpdateStudent = (id) => {
    this.setState({
      students: this.state.students.map((s) =>
        s.id === id ? this.state.student : s
      ),
    });

    this.handleCancelEdit();
  };

  render() {
    return (
      <div>
        <StudentForm
          students={this.state.students}
          student={this.state.student}
          errors={this.state.errors}
          isFormValid={this.state.isFormValid}
          isEditing={this.state.isEditing}
          handleInputChange={this.handleInputChange}
          handleSubmitForm={this.handleSubmitForm}
          handleUpdateStudent={this.handleUpdateStudent}
          handleCancelEdit={this.handleCancelEdit}
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
