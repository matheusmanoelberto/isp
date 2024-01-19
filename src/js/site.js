$(document).ready(function () {
  const API_URL = 'https://club-api-sicoob.onrender.com'
  //const API_URL = 'http://localhost:3003'

  $("#alert-success").hide()
  $("#alert-error").hide()
  $("#form-login").show()

  $("#alert-cad-success").hide()
  $("#alert-cad-error").hide()

  $("#btn-login").click(function () {
    const cpfOrCnpj = $("#txt-cpf-or-cnpj").val()
    if (!cpfOrCnpj) {
      $("#login-help").show()
      $("#login-help").text("Informe o CPF ou CNPJ")
      return
    }

    $.ajax({
      url: `${API_URL}/valid/${cpfOrCnpj}`,
      dataType: 'json',
      beforeSend: function () {
        $("#login-help").hide()
        $("#form-login").hide()
        $("#alert-success").show()
      },
      success: function (data) {
        // success, do work
      },
      error: function (data) {
        $("#form-login").show()
        $("#alert-error").show()
        $("#alert-success").hide()

        if (data?.responseJSON?.error) {
          $("#login-help").show()
          $("#login-help").text(data.responseJSON.error)
        }
      },

    })
  })

  $("#btn-cadastro-beneficiario").click(function () {
    const padlod = {
      cpf_or_cnpj: $("#txt-cd-cpf-or-cnpj").val(),
      email: $('#txt-cd-email').val()
    }

    if (!padlod.cpf_or_cnpj || !padlod.email) {
      $("#login-cad-help").show()
      $("#login-cad-help").text("Informe o CPF ou CNPJ e o Email")
      return
    }

    $("#alert-cad-success").hide()
    $("#alert-cad-error").hide()

    const url = `${API_URL}/beneficiaries`
    let xhr = new XMLHttpRequest()

    // 
    $("#btn-cadastro-beneficiario").text("Processando...")
    

    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.send(JSON.stringify(padlod));
    xhr.onload = function () {
      const res = JSON.parse(xhr.response)

      if(res.error) {
        $("#btn-cadastro-beneficiario").text("Iniciar o cadastro")
        $("#alert-cad-error").show()
        $("#alert-cad-error").text(res.error)
      } else {
        $("#btn-cadastro-beneficiario").text("OK")
        $("#btn-cadastro-beneficiario").hide()

        $("#alert-cad-success").show()
      }
    }
  })
});