$(function () {
    'use strict';

    // Ambil semua formulir yang ingin kita terapkan gaya validasi kustom Bootstrap
    const forms = $('.needs-validation');

    // Loop melalui formulir dan mencegah pengiriman
    forms.on('submit', function (event) {
        const form = $(this);

        var actionInput = $(this).find("input[name='action']");

        if (!form[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            $('.submit_form').html('Sending...');
            $('.btn_submit-subscribe').html('Sending...');
            const toast = new bootstrap.Toast($('.success_msg')[0]);
            const errtoast = new bootstrap.Toast($('.error_msg')[0]);
            var formData = forms.serializeArray().reduce(function(a, x) { a[x.name] = x.value; return a; }, {});;
            $.ajax({
                type: "POST",
                url: "/form",
                data: JSON.stringify(formData),
                success: function (response) {
                    if (response == 'success') {
                        if (actionInput.length > 0) {
                            $('.btn_submit-subscribe').html('Subscribe');
                            const toast_subscribe = new bootstrap.Toast($('.success_msg_subscribe')[0]);
                            toast_subscribe.show();
                        } else {
                            toast.show()
                            $('.submit_form').html('SUBMIT');                            
                        }

                    } else {
                        errtoast.show()
                        $('.submit_form').html('SUBMIT');
                        $('.btn_submit-subscribe').html('Subscribe');
                    }
                }
            });
        }

        form.addClass('was-validated');
    });
});