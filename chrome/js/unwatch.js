form = $('form[action=\"/notifications/subscribe\"]');
$(form).find('#do_included').attr('checked', true);
$(form).find('#do_included').removeAttr('checked');
$(form).submit();
