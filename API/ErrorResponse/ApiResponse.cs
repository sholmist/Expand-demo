namespace API.ErrorResponse
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string errorMessage = null)
        {
            StatusCode = statusCode;
            ErrorMessage = errorMessage ?? DefaultErrorMessage(statusCode);
        }

        public int StatusCode { get; set; }
        public string ErrorMessage { get; set; }

        private string DefaultErrorMessage(int statusCode)
        {
            switch (statusCode)
            {
                case 400:
                    return "A bad request, you have made";
                case 401:
                    return "Authorized, you are not";
                case 404:
                    return "Resource found, it was not";
                case 500:
                    return "Errors are the path to the dark side. Errors lead to anger. Anger leads to hate. Hate leads to career change.";  //sponsored by GitHub Copilot
                default:
                    return "An error has occured";
            }
        }
    }
}