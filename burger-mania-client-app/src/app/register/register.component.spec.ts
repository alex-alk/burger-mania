import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { defer, Observable, of } from 'rxjs';
import { BigButtonComponent } from '../big-button/big-button.component';
import { GroupBoxComponent } from '../group-box/group-box.component';
import { HeaderTitleComponent } from '../headertitle/header-title.component';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let element: HTMLElement;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent, GroupBoxComponent, BigButtonComponent, HeaderTitleComponent],
      providers: [HttpClient, HttpHandler],
      imports: [RouterTestingModule, ReactiveFormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.nativeElement;
  });
  describe('Layout', () => {
    it(`has title of 'Înregistrare'`, () => {
      expect(element.textContent).toContain('Înregistrare');
    });
    it("has input for username", () => {
      const usernameInput = element.querySelector('input[name=username]');
      expect(usernameInput).toBeTruthy();
    });
    it("has input for email", () => {
      const emailInput = element.querySelector('input[name=email]');
      expect(emailInput).toBeTruthy();
    });
    it("has email type for email input", () => {
      const emailInput = element.querySelector('input[name=email]');
      expect(emailInput?.getAttribute('type')).toEqual("email");
    });
    it("has input for password", () => {
      const passwordInput = element.querySelector('input[name=password]');
      expect(passwordInput).toBeTruthy();
    });
    it("has password type for password input for password", () => {
      const passwordInput = element.querySelector('input[name=password]');
      expect(passwordInput?.getAttribute('type')).toEqual('password');
    });
    it("has input for verifyPassword", () => {
      const verifyPassword = element.querySelector('input[name=verifyPassword]');
      expect(verifyPassword).toBeTruthy();
    });
    it("has password type for verifyPassword", () => {
      const verifyPassword = element.querySelector('input[name=verifyPassword]');
      expect(verifyPassword?.getAttribute('type')).toEqual('password');
    });
    it("has input for phone number", () => {
      const phoneInput = element.querySelector('input[name=phoneNumber]');
      expect(phoneInput).toBeTruthy();
    });
    it('has submit button', () => {
      const button = element.querySelector('button');
      expect(button).toBeTruthy();
    });
  })
  describe('Interactions', () => {

    let button: HTMLButtonElement,
    emailInput: HTMLInputElement,
    usernameInput: HTMLInputElement,
    passwordInput: HTMLInputElement,
    verifyPassword: HTMLInputElement,
    phoneNumberInput: HTMLInputElement;

    const setupForSubmit = () => {
      //const rendered = render(<UserSignupPage {...input} />);

      usernameInput = element.querySelector('input[name=username]')!;
      emailInput = element.querySelector('input[name=email]')!;
      passwordInput = element.querySelector('input[name=password]')!;
      verifyPassword = element.querySelector('input[name=verifyPassword]')!;
      phoneNumberInput = element.querySelector('input[name=phoneNumber]')!;

      usernameInput.value = 'abc';
      usernameInput?.dispatchEvent(new Event('input'));
      emailInput.value = 'abc';
      emailInput?.dispatchEvent(new Event('input'));
      passwordInput.value = 'abc';
      passwordInput?.dispatchEvent(new Event('input'));
      verifyPassword.value= 'abc';
      verifyPassword?.dispatchEvent(new Event('input'));
      phoneNumberInput.value = 'abc';
      phoneNumberInput?.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      
      button = element.querySelector('button')!;
      //return rendered;
    };

    const mockAsync = () => {
      return defer(() => {
        return new Promise((resolve, reject) => {resolve({})});
      });
    };

    const mockAsyncDelayed = () => {
      return defer(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({});
          }, 300);
        });
      });
    };
    const mockAsyncDelayedError = () => {
      return defer(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject({});
          }, 300);
        });
      });
    };

    it("sets the username value into form object", () => {
      const usernameInput: HTMLInputElement = element.querySelector('input[name=username]')!;
      usernameInput.value = 'abcd';
      usernameInput?.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.newUserForm.value.username).toBe("abcd");
    });


    it("sets the email value into form object", () => {
      const emailInput: HTMLInputElement = element.querySelector('input[name=email]')!;
      emailInput.value = 'my-email'
      emailInput?.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(emailInput.value).toEqual("my-email");
    });

    it("sets the password value into form object", () => {
      const passwordInput: HTMLInputElement = element.querySelector('input[name=password]')!;
      passwordInput.value = 'my-password'
      passwordInput?.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(passwordInput.value).toEqual("my-password");
    });
    it("sets the verify password value into form object", () => {
      const verifyPassword: HTMLInputElement = element.querySelector('input[name=verifyPassword]')!;
      verifyPassword.value = 'my-password'
      verifyPassword?.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(verifyPassword.value).toEqual("my-password");
    });
    it("sets the phone number value into form object", () => {
      const phoneNumberInput: HTMLInputElement = element.querySelector('input[name=phoneNumber]')!;
      phoneNumberInput.value = 'my-phone'
      phoneNumberInput?.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(phoneNumberInput.value).toEqual("my-phone");
    });
    it("calls postSignup when fields are valid and the actions are provided in @Input", () => {
      component.actions = {postSignup: mockAsync};
      setupForSubmit();
      spyOn(component.actions, 'postSignup').and.callThrough();

      button.click();
      expect(component.actions.postSignup).toHaveBeenCalledTimes(1);
    });
    it("does not throw exception when clicking the button when actions not provided @Input", () => {
      setupForSubmit();
      expect(() => button.click()).not.toThrow();
    });
    it("calls post with user body when the fields are valid", () => {
      component.actions = {postSignup: mockAsync};
      setupForSubmit();

      usernameInput.value = 'abc';
      usernameInput?.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const expectedUserObject: any = {
        username: "abc",
        email: "abc",
        password: "abc",
        verifyPassword: "abc",
        phone: "abc"
      };
      spyOn(component.actions, 'postSignup').and.callThrough();
      button.click();
      expect(component.actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
    });
    it("does not allow user to click the Sign Up button when there is an ongoing api call", () => {
      component.actions = {postSignup: mockAsyncDelayed};
      setupForSubmit();
      spyOn(component.actions, 'postSignup').and.callThrough()
      button.click();
      fixture.detectChanges();
      button.click();
      expect(component.actions.postSignup).toHaveBeenCalledTimes(1);
    });
    it("displays spinner when there is an ongoing api call", () => {
      component.actions = {postSignup: mockAsyncDelayed};
      setupForSubmit();
      button.click();
      fixture.detectChanges();

      const spinner = element.querySelector('.sr-only')!;
      expect(spinner).toBeTruthy();
    });
    it("hides spinner after api call finishes successfully", () => {
      component.actions = {postSignup: mockAsync};
      setupForSubmit();

      waitForAsync(() => {
        button.click();
      })

      const spinner = element.querySelector('.sr-only')!;
      expect(spinner).not.toBeTruthy();
    });
    it("hides spinner after api call finishes with error", () => {
      component.actions = {postSignup: mockAsyncDelayedError};
      setupForSubmit();

      waitForAsync(() => {
        button.click();
      })
      fixture.detectChanges();
      
      const spinner = element.querySelector('.sr-only')!;
      expect(spinner).not.toBeTruthy();
    });
  });
});
