document.addEventListener("DOMContentLoaded", function () {
  var quizzes = document.querySelectorAll("[data-quiz]");

  quizzes.forEach(function (quiz) {
    var form = quiz.querySelector("form");
    var result = quiz.querySelector("[data-quiz-result]");
    var resetButton = quiz.querySelector("[data-quiz-reset]");

    if (!form || !result) {
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var questions = form.querySelectorAll("[data-answer]");
      var total = questions.length;
      var answered = 0;
      var correct = 0;

      questions.forEach(function (question) {
        var answer = question.getAttribute("data-answer");
        var selected = question.querySelector("input[type='radio']:checked");
        var feedback = question.querySelector("[data-feedback]");

        question.classList.remove("is-correct", "is-incorrect");

        if (feedback) {
          feedback.hidden = true;
          feedback.textContent = "";
        }

        if (!selected) {
          return;
        }

        answered += 1;

        if (selected.value === answer) {
          correct += 1;
          question.classList.add("is-correct");
        } else {
          question.classList.add("is-incorrect");
        }

        if (feedback) {
          var explanation = question.getAttribute("data-explanation");
          var option = question.querySelector("input[value='" + answer + "']");
          var optionLabel = "";

          if (option && option.parentElement) {
            optionLabel = option.parentElement.textContent.trim();
          }

          feedback.innerHTML =
            "<strong>" + (selected.value === answer ? "Correct." : "Not quite.") + "</strong> " +
            "Best answer: " + optionLabel + "<br>" + explanation;
          feedback.hidden = false;
        }
      });

      if (answered < total) {
        result.innerHTML = "<strong>Please answer all " + total + " questions before scoring the quiz.</strong>";
        result.hidden = false;
        return;
      }

      var percent = Math.round((correct / total) * 100);
      var rating = "Foundational";
      var summary = "You have some understanding, but there are still major gaps in how this perspective is being interpreted.";

      if (correct >= 17) {
        rating = "Strong";
        summary = "You show strong understanding of this perspective and the communication patterns behind it.";
      } else if (correct >= 13) {
        rating = "Growing";
        summary = "You are seeing many of the important patterns, but there is still room for deeper empathy and clarity.";
      } else if (correct >= 9) {
        rating = "Developing";
        summary = "You are starting to understand the perspective, but some key motivations and stress responses are still being missed.";
      }

      result.innerHTML =
        "<strong>Score: " + correct + " / " + total + " (" + percent + "%)</strong><br>" +
        "Understanding rating: <strong>" + rating + "</strong><br>" +
        summary;
      result.hidden = false;
    });

    if (resetButton) {
      resetButton.addEventListener("click", function () {
        form.reset();
        result.hidden = true;
        result.textContent = "";

        var questions = form.querySelectorAll("[data-answer]");

        questions.forEach(function (question) {
          var feedback = question.querySelector("[data-feedback]");
          question.classList.remove("is-correct", "is-incorrect");

          if (feedback) {
            feedback.hidden = true;
            feedback.textContent = "";
          }
        });
      });
    }
  });
});
