package com.alexandruleonte.burger.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;

@Configuration
@EnableWebSecurity
public class BasicAuthConfiguration
  extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(AuthenticationManagerBuilder auth)
      throws Exception {
    	PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        auth
          .inMemoryAuthentication()
          .withUser("user")
          .password(encoder.encode("pass"))
          .roles("USER");
    }

    @Override
    protected void configure(HttpSecurity http)
      throws Exception {
    	http.addFilterBefore(new CorsFilter(), ChannelProcessingFilter.class)
        .httpBasic()
      .and()
        .authorizeRequests()
          .antMatchers("/api").permitAll()
    	  .antMatchers(HttpMethod.GET,"/api/users").hasRole("USER")
    	  .antMatchers(HttpMethod.POST, "/api/users").permitAll()
      .and().csrf().disable();
    }
}
