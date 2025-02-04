$("#success-alert")
  .fadeTo(2000, 500)
  .slideUp(500, function () {
    $("#success-alert").slideUp(600);
  });

$("#failure-alert")
  .fadeTo(2000, 500)
  .slideUp(500, function () {
    $("#failure-alert").slideUp(600);
  });

$("#appointment-success-box")
  .fadeTo(2000, 500)
  .slideUp(500, function () {
    $("#appointment-success-box").slideUp(600);
  });

//js for displaying and selecting only years in datepicker
$("#year")
  .datepicker({
    format: "yyyy",
    viewMode: "years",
    minViewMode: "years",
    autoclose: true, //to close picker once year is selected
  })
  .on("change", function () {
    if ($("#personalInfoForm").length) {
      $("#personalInfoForm").validate().element("#year");
    } else {
      $("#gTestpersonalInfoForm").validate().element("#year");
    }
    $(".datepicker").hide();
  });

//js for displaying calender in datepicker
$("#dob")
  .datepicker({
    format: "mm/dd/yyyy",
  })
  .on("change", function () {
    if ($("#personalInfoForm").length) {
      $("#personalInfoForm").validate().element("#dob");
    } else {
      $("#gTestpersonalInfoForm").validate().element("#dob");
    }
    $(".datepicker").hide();
  });

$("#date")
  .datepicker({
    format: "mm/dd/yyyy",
    startDate: new Date(),
  })
  .on("change", function () {});

$("#dateG2")
  .datepicker({
    format: "mm/dd/yyyy",
    startDate: new Date(),
  })
  .on("change", function () {});

$("#dateG")
  .datepicker({
    format: "mm/dd/yyyy",
    startDate: new Date(),
  })
  .on("change", function () {});

jQuery.validator.addMethod(
  "age18",
  function ValidateDOB(value) {
    var parts = value.split("/");
    var dtDOB = new Date(parts[0] + "/" + parts[1] + "/" + parts[2]);
    var dtCurrent = new Date();
    if (dtCurrent.getFullYear() - dtDOB.getFullYear() < 18) {
      return false;
    }
    if (dtCurrent.getFullYear() - dtDOB.getFullYear() == 18) {
      //CD: 11/06/2018 and DB: 15/07/2000. Will turned 18 on 15/07/2018.
      if (dtCurrent.getMonth() < dtDOB.getMonth()) {
        return false;
      }
      if (dtCurrent.getMonth() == dtDOB.getMonth()) {
        //CD: 11/06/2018 and DB: 15/06/2000. Will turned 18 on 15/06/2018.
        if (dtCurrent.getDate() < dtDOB.getDate()) {
          return false;
        }
      }
    }
    return true;
  },
  "Must be atleast 18 yrs of age"
);

// custom validation for eliminating spaces at start
jQuery.validator.addMethod(
  "noSpace",
  function (value, element) {
    return /^[^-\s][a-zA-Z0-9_\s-]+$/.test(value);
  },
  "No space and special characters and don't leave it empty"
);

// custom validation for email address
jQuery.validator.addMethod(
  "customEmail",
  function (value, element) {
    return (
      this.optional(element) ||
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
        value
      )
    );
  },
  "Please enter valid email address!"
);

// custom validation for alphanumeric text
$.validator.addMethod(
  "alphanumeric",
  function (value, element) {
    return this.optional(element) || /^\w+$/i.test(value);
  },
  "Letters, numbers, and underscores only please"
);

// custom validation for number fields
$.validator.addMethod(
  "numbers",
  function (value, element) {
    return this.optional(element) || /^\d+$/.test(value);
  },
  "This field accepts only numbers"
);

// custom validation for 8 character for license
$.validator.addMethod(
  "eightchars",
  function (value, element) {
    if (value.length >= 8) {
      return true;
    }
    return false;
  },
  "Must be 8 characters"
);

//jQuery validations for forms
var $registrationForm = $("#personalInfoForm");

if ($registrationForm.length) {
  $registrationForm.validate({
    rules: {
      //username is the name of the textbox
      fname: {
        required: true,
        noSpace: true,
      },
      lname: {
        required: true,
        noSpace: true,
      },
      license: {
        required: true,
        noSpace: true,
        alphanumeric: true,
        eightchars: true,
      },
      age: {
        required: true,
        noSpace: true,
        numbers: true,
      },
      dob: {
        required: true,
        age18: true,
      },
      make: {
        required: true,
        noSpace: true,
      },
      model: {
        required: true,
        noSpace: true,
      },
      year: {
        required: true,
      },
      color: {
        required: true,
        noSpace: true,
      },
      numberPlate: {
        required: true,
        noSpace: true,
        numbers: true,
      },
    },
    messages: {
      fname: {
        //error message for the required field
        required: "Please enter first name",
      },
      lname: {
        required: "Please enter last name",
      },
      license: {
        required: "Please enter license number",
      },
      age: {
        required: "Please enter age",
      },
      dob: {
        required: "Please enter dob",
      },
      make: {
        required: "Please enter make for car",
      },
      model: {
        required: "Please enter model of car",
      },
      year: {
        required: "Please enter the year",
      },
      color: {
        required: "Please enter color of car",
      },
      numberPlate: {
        required: "Please enter plate number",
      },
    },
    errorPlacement: function (error, element) {
      if (element.is(":radio")) {
        error.appendTo(element.parents(".gender"));
      } else if (element.is(":checkbox")) {
        error.appendTo(element.parents(".hobbies"));
      } else {
        error.addClass("arrow");
        error.insertAfter(element.parents(".form-outline"));
      }
    },
    wrapper: "span",
  });
}

var $userRegistrationForm = $("#registrationForm");
if ($userRegistrationForm.length) {
  $userRegistrationForm.validate({
    rules: {
      //username is the name of the textbox
      username: {
        required: true,
        noSpace: true,
      },
      password: {
        required: true,
        minlength: 5,
      },
      confirmPassword: {
        required: true,
        minlength: 5,
        equalTo: "#password",
      },
      userType: {
        required: true,
      },
    },
    messages: {
      username: {
        //error message for the required field
        required: "Please enter user name",
      },
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long",
      },
      confirmPassword: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long",
        equalTo: "Please enter the same password as above",
      },
      userType: {
        required: "Please enter the user type",
      },
    },
    errorPlacement: function (error, element) {
      if (element.is(":radio")) {
        error.appendTo(element.parents(".gender"));
      } else if (element.is(":checkbox")) {
        error.appendTo(element.parents(".hobbies"));
      } else {
        error.addClass("arrow");
        error.insertAfter(element.parents(".form-outline"));
      }
    },
    wrapper: "span",
  });
}

var $gTestpersonalInfoForm = $("#gTestpersonalInfoForm");
if ($gTestpersonalInfoForm.length) {
  $gTestpersonalInfoForm.validate({
    rules: {
      //username is the name of the textbox
      make: {
        required: true,
        noSpace: true,
      },
      model: {
        required: true,
        noSpace: true,
      },
      year: {
        required: true,
      },
      color: {
        required: true,
        noSpace: true,
      },
      numberPlate: {
        required: true,
        noSpace: true,
        numbers: true,
      },
    },
    messages: {
      make: {
        required: "Please enter make for car",
      },
      model: {
        required: "Please enter model of car",
      },
      year: {
        required: "Please enter the year",
      },
      color: {
        required: "Please enter color of car",
      },
      numberPlate: {
        required: "Please enter plate number",
      },
    },
    errorPlacement: function (error, element) {
      if (element.is(":radio")) {
        error.appendTo(element.parents(".gender"));
      } else if (element.is(":checkbox")) {
        error.appendTo(element.parents(".hobbies"));
      } else {
        error.addClass("arrow");
        error.insertAfter(element.parents(".form-outline"));
      }
    },
    wrapper: "span",
  });
}
