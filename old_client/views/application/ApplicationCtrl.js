const angular = require("angular");
const swal = require("sweetalert");

angular.module("reg").constant('')

angular.module("reg").controller("ApplicationCtrl", [
  "$scope",
  "$rootScope",
  "$state",
  "$http",
  "currentUser",
  "settings",
  "Session",
  "UserService",
  "DASHBOARD",
  function(
    $scope,
    $rootScope,
    $state,
    $http,
    currentUser,
    settings,
    Session,
    UserService,
    DASHBOARD
  ) {
    let base = '/api/users/';
    // Set up the user
    $scope.user = currentUser.data;
    

    // Is the student from CMU?
    $scope.isCmuStudent =
      $scope.user.email.split("@")[1] == "andrew.cmu.edu" ||
      $scope.user.email.split("@")[1] == "cmu.edu";

    // If so, default them to adult: true
    if ($scope.isCmuStudent) {
      $scope.user.profile.adult = true;
    }

    // Populate the school dropdown
    populateSchools();
    _setupForm();

    $scope.regIsClosed = Date.now() > settings.data.timeClose;

    /**
     * TODO: JANK WARNING
     */
    function populateSchools() {
      $http.get("/assets/schools.json").then(function(res) {
        var schools = res.data;
        var email = $scope.user.email.split("@")[1];

        if (schools[email]) {
          $scope.user.profile.school = schools[email].school;
          $scope.autoFilledSchool = true;
        }
      });

      $http.get("/assets/schools.csv").then(function(res) {
        $scope.schools = res.data.split("\n");
        $scope.schools.push("Other");

        var content = [];

        for (i = 0; i < $scope.schools.length; i++) {
          $scope.schools[i] = $scope.schools[i].trim();
          content.push({ title: $scope.schools[i] });
        }

        $("#school.ui.search").search({
          source: content,
          cache: true,
          onSelect: function(result, response) {
            $scope.user.profile.school = result.title.trim();
          }
        });
      });
    }

    function _updateUser(e) {
      UserService.updateProfile(Session.getUserId(), $scope.user.profile).then(
        response => {
          swal("Awesome!", "Your application has been saved.", "success").then(
            value => {
              $state.go("app.dashboard");
            }
          );
        },
        response => {
          swal("Uh oh!", "Something went wrong. Please make sure you have entered a valid phone number, or contact hello@scottylabs.org for help.", "error");
        }
      );
    }

    function isMinor() {
      return !$scope.user.profile.adult;
    }

    function minorsAreAllowed() {
      return settings.data.allowMinors;
    }

    function minorsValidation() {
      // Are minors allowed to register?
      if (isMinor() && !minorsAreAllowed()) {
        return false;
      }
      return true;
    }

    function _setupForm() {
      // Custom minors validation rule
      $.fn.form.settings.rules.allowMinors = function(value) {
        return minorsValidation();
      };

      // Semantic-UI form validation
      $(".ui.form").form({
        inline: true,
        fields: {
          name: {
            identifier: "name",
            rules: [
              {
                type: "empty",
                prompt: "Please enter your name."
              }
            ]
          },
          school: {
            identifier: "school",
            rules: [
              {
                type: "empty",
                prompt: "Please enter your school name."
              }
            ]
          },
          year: {
            identifier: "year",
            rules: [
              {
                type: "empty",
                prompt: "Please select your graduation year."
              }
            ]
          },
          gender: {
            identifier: "gender",
            rules: [
              {
                type: "empty",
                prompt: "Please select a gender."
              }
            ]
          },
          phone: {
            identifier: "phone",
            rules: [
              {
                type: "empty",
                prompt: "Please enter a phone number."
              }
            ]
          },
          study: {
            identifier: "study",
            rules: [
              {
                type: "empty",
                prompt: "Please enter your major."
              }
            ]
          },
          resume: {
            identifier: "resume",
            rules: [
              {
                type: "empty",
                prompt: "Please enter your resume."
              }
            ]
          }
        }
      });
    }

    function _storeResume() {
      const resumeName = $scope.user.profile.name.replace(/\s/g, '_') + '_Resume';
      const resumeFile = document.getElementById("resume").files[0];

      console.log(resumeFile);
      if (resumeFile.size > 5000000) {
        swal("Uh oh.", "Your resume is too big. Please upload a smaller resume.", "error");
        return;
      }
      let reader = new FileReader();
      $scope.user.profile.email = $scope.user.email;
      reader.onload = (() => {
        let data = {
          "resumeName": resumeName,
          "dataURL": reader.result,
          "profile": $scope.user.profile,
          "fileId": $scope.user.profile.resume
        }
        let firstTimeSubmitting = ($scope.user.verified && !$scope.user.status.completedProfile);
        if (firstTimeSubmitting) {
          $http.post(base + 'resume', data)
            .then((res) => {
              $scope.user.profile.resume = res.data.fileId;
              _updateUser();
            }, (err) => {
              swal('There was a resume submission error, please contact hello@scottylabs.org immediately.');	
	  	        console.log(JSON.stringify(err));
            });
        }
        else {
          $http.put(base + 'resume', data)
            .then((res) => {
              _updateUser();
            }, (err) => {
              swal('There was a resume submission error, please contact hello@scottylabs.org immediately.');
	    	      console.log(JSON.stringify(err));
            });
        }
      });
      reader.readAsDataURL(resumeFile);
      
    }
      
    $scope.submitForm = function() {
      if ($(".ui.form").form("is valid")) {
        swal("Please don't click the submit button or refresh until the resume finishes uploading!", {button: false});
        _storeResume();
      } else {
        swal("Uh oh!", "Please Fill The Required Fields", "error");
      }
    };
  }
]);
