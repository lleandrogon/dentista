$(document).ready(function () {
    $('header a').on('click', function (event) {
        event.preventDefault();

        const target = $(this).attr('href');

        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 100);
    });

    $('#agendar-consulta').on('click', function (event) {
        event.preventDefault();

        const faleConoscoSection = $('#fale-conosco');

        if (faleConoscoSection.length) {
            $('html, body').animate({
                scrollTop: faleConoscoSection.offset().top
            }, 100);
        }
    });

    $('#form-agendamento').on('submit', function (event) {
        event.preventDefault();

        let nome = $('#nome').val().trim();
        let telefone = $('#telefone').val().trim();
        let email = $('#email').val().trim();
        let data = $('#data').val().trim();
        let periodo = $('#periodo').val();

        let isValid = true;

        if (nome === '' || telefone === '' || email === '' || data === '' || !periodo) {
            $('#error-message').text('Todos os campos devem ser preenchidos.').show();
            isValid = false;
        } else {
            $('#error-message').hide();
        }

        let regex = /\d/;
        if (regex.test(nome)) {
            alert('O campo Nome não pode conter números.');
            isValid = false;
        }

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('O campo Email deve ser um email válido.');
            isValid = false;
        }

        $('#telefone').on('blur', function () {
            let input = $(this).val().replace(/\D/g, '');
            if (input.length < 10 || input.length > 11) {
                alert('Por favor, insira um número de telefone válido com DDD.');
                isValid = false;
            }
        });

        let dataAtual = new Date();
        let dataAgendada = new Date(data);
        if (dataAgendada < dataAtual) {
            alert('A data agendada não pode estar no passado.');
            isValid = false;
        }

        if (isValid) {
            let dados = {
                nome: nome,
                telefone: telefone,
                email: email,
                data: data,
                periodo: periodo
            };
            
            alert('Agendação enviada com sucesso!');
            console.log('Dados do Formulário:', dados);
        }
    });
});