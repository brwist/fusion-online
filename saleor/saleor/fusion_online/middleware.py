from django.http import HttpResponse

def health_check_allow_any_host(get_response):
    """Bypass the ALLOWED_HOSTS check for requests against the health check endpoint."""

    def _health_check_allow_any_host_middleware(request):
        if request.META["PATH_INFO"] == "/__health/":
            return HttpResponse("OK")
        
        return get_response(request)

    return _health_check_allow_any_host_middleware
