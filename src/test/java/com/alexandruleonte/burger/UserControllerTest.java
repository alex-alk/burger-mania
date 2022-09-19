package com.alexandruleonte.burger;

import com.alexandruleonte.burger.error.ApiError;
import com.alexandruleonte.burger.shared.GenericResponse;
import com.alexandruleonte.burger.user.User;
import com.alexandruleonte.burger.user.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserControllerTest {

    private static final String API_USERS = "/api/users";

    @Autowired
    TestRestTemplate testRestTemplate;

    @Autowired
    UserRepository userRepository;

    @Before
    public void cleanup() {
        userRepository.deleteAll();
    }

    @Test
    public void postUser_whenUserIsValid_receiveCreated() {
        User user = createValidUser();

        ResponseEntity<Object> response = postSignup(user, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    }

    @Test
    public void postUser_whenUserIsValid_userSavedToDatabase() {
        User user = createValidUser();
        postSignup(user, Object.class);
        assertThat(userRepository.count()).isEqualTo(1);
    }

    @Test
    public void postUser_whenUserIsValid_receiveSuccessMessage() {
        User user = createValidUser();
        ResponseEntity<GenericResponse> response = postSignup(user, GenericResponse.class);
        assertThat(response.getBody().getMessage()).isNotNull();
    }

    @Test
    public void postUser_whenUserIsValid_passwordIsHashedInDatabase() {
        User user = createValidUser();
        testRestTemplate.postForEntity(API_USERS, user, GenericResponse.class);
        List<User> users = userRepository.findAll();
        User inDb = users.get(0);
        assertThat(inDb.getPassword()).isNotEqualTo(user.getPassword());
    }

    @Test
    public void postUser_whenUserHasBlankUsername_receiveBadRequest() {
        User user = createValidUser();
        user.setUsername("  ");
        ResponseEntity<Object> response = postSignup(user, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasBlankFirstName_receiveBadRequest() {
        User user = createValidUser();
        user.setFirstName("   ");
        ResponseEntity<Object> response = postSignup(user, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasBlankLastName_receiveBadRequest() {
        User user = createValidUser();
        user.setFirstName("   ");
        ResponseEntity<Object> response = postSignup(user, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasBlankPassword_receiveBadRequest() {
        User user = createValidUser();
        user.setPassword("   ");
        ResponseEntity<Object> response = postSignup(user, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasBlankAddress_receiveBadRequest() {
        User user = createValidUser();
        user.setAddress("   ");
        ResponseEntity<Object> response = postSignup(user, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasFirstNameExceedsTheLengthLimit_receiveBadRequest() {
        User user = createValidUser();
        String valueOf20Chars = IntStream.rangeClosed(1, 21).mapToObj(x -> "a")
                        .collect(Collectors.joining());
        user.setFirstName(valueOf20Chars);
        ResponseEntity<Object> response = postSignup(user, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasPasswordWithLessThanRequired_receiveBadRequest() {
        User user = createValidUser();
        user.setPassword("passS1");
        ResponseEntity<Object> response = postSignup(user, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasPasswordWithAllLowercase_receiveBadRequest() {
        User user = createValidUser();
        user.setPassword("aaaaaaaa");
        ResponseEntity<Object> response = postSignup(user, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasPasswordWithAllUppercase_receiveBadRequest() {
        User user = createValidUser();
        user.setPassword("AAAAAAAA");
        ResponseEntity<Object> response = postSignup(user, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasPasswordWithAllNumbers_receiveBadRequest() {
        User user = createValidUser();
        user.setPassword("12345678");
        ResponseEntity<Object> response = postSignup(user, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserIsInvalid_receiveApiError() {
        User user = new User();
        ResponseEntity<ApiError> response = postSignup(user, ApiError.class);
        assertThat(response.getBody().getUrl()).isEqualTo(API_USERS);
    }

    @Test
    public void postUser_whenUserIsInvalid_receiveApiErrorWithValidationErrors() {
        User user = new User();
        ResponseEntity<ApiError> response = postSignup(user, ApiError.class);
        assertThat(response.getBody().getValidationErrors().size()).isEqualTo(5);
    }

    @Test
    public void postUser_whenUserHasEmptyUsername_receiveMessageOfRequiredUsername() {
        User user = createValidUser();
        user.setUsername("   ");
        ResponseEntity<ApiError> response = postSignup(user, ApiError.class);
        Map<String, String> validationErrors = response.getBody().getValidationErrors();
        assertThat(validationErrors.get("username")).isEqualTo("Email address is required");
    }

    @Test
    public void postUser_whenUserHasInvalidLengthPassword_receiveMessageOfSizeError() {
        User user = createValidUser();
        user.setPassword("Pa4");
        ResponseEntity<ApiError> response = postSignup(user, ApiError.class);
        Map<String, String> validationErrors = response.getBody().getValidationErrors();
        assertThat(validationErrors.get("password")).isEqualTo("It must have minimum 8 characters and maximum 100 characters");
    }

    @Test
    public void postUser_whenUserHasInvalidPasswordPattern_receiveMessageOfPasswordPatternError() {
        User user = createValidUser();
        user.setPassword("password");
        ResponseEntity<ApiError> response = postSignup(user, ApiError.class);
        Map<String, String> validationErrors = response.getBody().getValidationErrors();
        assertThat(validationErrors.get("password")).isEqualTo(
                "Password must have at least one uppercase, one lowercase letter and one number");
    }

    @Test
    public void postUser_whenUserHasEmptyFirstName_receiveMessageOfRequiredFirstName() {
        User user = createValidUser();
        user.setFirstName("   ");
        ResponseEntity<ApiError> response = postSignup(user, ApiError.class);
        Map<String, String> validationErrors = response.getBody().getValidationErrors();
        assertThat(validationErrors.get("firstName")).isEqualTo("First name is required");
    }

    @Test
    public void postUser_whenUserHasInvalidLengthFirstName_receiveMessageOfSizeError() {
        User user = createValidUser();
        String valueOf20Chars = IntStream.rangeClosed(1, 21).mapToObj(x -> "a")
                .collect(Collectors.joining());
        user.setFirstName(valueOf20Chars);
        ResponseEntity<ApiError> response = postSignup(user, ApiError.class);
        Map<String, String> validationErrors = response.getBody().getValidationErrors();
        assertThat(validationErrors.get("firstName")).isEqualTo("It must have maximum 20 characters");
    }

    @Test
    public void postUser_whenUserHasEmptyLastName_receiveMessageOfRequiredLastName() {
        User user = createValidUser();
        user.setLastName("   ");
        ResponseEntity<ApiError> response = postSignup(user, ApiError.class);
        Map<String, String> validationErrors = response.getBody().getValidationErrors();
        assertThat(validationErrors.get("lastName")).isEqualTo("Is required");
    }

    @Test
    public void postUser_whenUserHasEmptyAddress_receiveMessageOfRequired() {
        User user = createValidUser();
        user.setAddress("   ");
        ResponseEntity<ApiError> response = postSignup(user, ApiError.class);
        Map<String, String> validationErrors = response.getBody().getValidationErrors();
        assertThat(validationErrors.get("address")).isEqualTo("Is required");
    }

    @Test
    public void postUser_whenUserHasEmptyPhoneNumber_receiveMessageOfRequired() {
        User user = createValidUser();
        user.setPhone("   ");
        ResponseEntity<ApiError> response = postSignup(user, ApiError.class);
        Map<String, String> validationErrors = response.getBody().getValidationErrors();
        assertThat(validationErrors.get("phone")).isEqualTo("Is required");
    }

    public <T> ResponseEntity<T> postSignup(Object request, Class<T> response) {
        return testRestTemplate.postForEntity(API_USERS, request, response);
    }

    private User createValidUser() {
        User user = new User();
        user.setUsername("test-user");
        user.setFirstName("test-first");
        user.setLastName("test-last");
        user.setPassword("passwordD1");
        user.setPhone("123");
        user.setAddress("Abc");
        return user;
    }
}

