const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_GRID);

module.exports = {
  register(email) {
    const msg = {
      to: `${email}`,
      from: "noreply.todoapp@mail.com",
      subject: "You've Registered !",
      html: `
            You've Register to Todo Apps! </br>
            </br>
            </br>
            Don't Forget to add your task.`
    };
    return sgMail.send(msg);
  },

  login(email) {
    const msg = {
      to: `${email}`,
      from: "noreply.todoapp@mail.com",
      subject: "You've Login !",
      html: `
            You've Login to Todo Apps! <br>
            <br>
            <br>
            Don't Forget to add your task.`
    };
    return sgMail.send(msg);
  },

  addTODO(todo, email) {
    const msg = {
      to: `${email}`,
      from: "noreply.todoapp@mail.com",
      subject: "Task Created !",
      html: `Task Created ! <br>
            <br>
            TITLE : ${todo.title} <br>
            DESCRIPTION : ${todo.description} <br>
            STATUS : ${todo.status} <br>
            DEADLINE : ${todo.due_date}`
    };
    return sgMail.send(msg);
  }
}