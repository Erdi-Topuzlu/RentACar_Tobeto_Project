package com.tobeto.RentACar.security.config;

import com.tobeto.RentACar.security.config.jwt.JwtAuthenticationFilter;
import com.tobeto.RentACar.security.entities.Permission;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import static com.tobeto.RentACar.security.entities.Permission.*;
import static com.tobeto.RentACar.security.entities.Role.*;
import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        authorizeHttpRequests ->
                                authorizeHttpRequests
                                        .requestMatchers(
                                                "/api/v1/auth/**",
                                                "/api/v1/admin/campaigns/**",
                                                "/api/v1/admin/cars/getAll",
                                                "/api/v1/admin/cars/getById/**",
                                                "/api/v1/userImage/**",
                                                "/api/v1/admin/slider/getAll",
                                                "/api/v1/sliderImage/**",
                                                "/api/v1/carImage/**",
                                                "api/v1/campaigns/**",
                                                "/v2/api-docs",
                                                "/v3/api-docs",
                                                "/v3/api-docs/**",
                                                "/swagger-resources",
                                                "/swagger-resources/**",
                                                "/configuration/ui",
                                                "/configuration/security",
                                                "/swagger-ui/**",
                                                "/webjars/**",
                                                "/swagger-ui.html"
                                        )
                                        .permitAll()
                                        // Burada management endpoint'i için ADMIN ve MANAGER'e rol ve yetkilendirme verdik.
                                        .requestMatchers("/api/v1/management/**").hasAnyRole(ADMIN.name(), MANAGER.name())
                                        .requestMatchers(GET, "/api/v1/management/**").hasAnyAuthority(ADMIN_READ.name(), Permission.MANAGER_READ.name())
                                        .requestMatchers(POST, "/api/v1/management/**").hasAnyAuthority(ADMIN_CREATE.name(), Permission.MANAGER_CREATE.getPermission())
                                        .requestMatchers(PUT, "/api/v1/management/**").hasAnyAuthority(ADMIN_UPDATE.name(), Permission.MANAGER_UPDATE.name())
                                        .requestMatchers(DELETE, "/api/v1/management/**").hasAnyAuthority(Permission.ADMIN_DELETE.name(), Permission.MANAGER_DELETE.name())

                                        // Burada admin endpoint'i için sadece ADMIN'e rol ve yetkilendirme verdik.
                                        .requestMatchers("/api/v1/admin/**").hasRole(ADMIN.name())
                                        .requestMatchers(GET, "/api/v1/admin/**").hasAuthority(ADMIN_READ.name())
                                        .requestMatchers(POST, "/api/v1/admin/**").hasAuthority(ADMIN_CREATE.name())
                                        .requestMatchers(PUT, "/api/v1/admin/**").hasAuthority(ADMIN_UPDATE.name())
                                        .requestMatchers(PATCH, "/api/v1/admin/**").hasAuthority(ADMIN_UPDATE.name())
                                        .requestMatchers(DELETE, "/api/v1/admin/**").hasAuthority(ADMIN_DELETE.name())

                                        // Bura da user endpoint'i için USER, MANAGER ve ADMIN'e rol ve yetkilendirme verdik.
                                        .requestMatchers("api/v1/users/**").hasAnyRole(ADMIN.name(), MANAGER.name(), USER.name())
                                        .requestMatchers(GET, "api/v1/users/**").hasAnyAuthority(ADMIN_READ.name(), MANAGER_READ.name(), USER_READ.name())
                                        .requestMatchers(PUT, "api/v1/users/**").hasAnyAuthority(ADMIN_UPDATE.name(), MANAGER_UPDATE.name(), USER_UPDATE.name())
                                        .requestMatchers(POST, "api/v1/users/**").hasAnyAuthority(ADMIN_CREATE.name(), MANAGER_CREATE.name(), USER_CREATE.name())
                                        .requestMatchers(PATCH, "api/v1/users/**").hasAnyAuthority(ADMIN_CREATE.name(), MANAGER_CREATE.name(), USER_CREATE.name())
                                        .anyRequest()
                                        .authenticated()

                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logOut ->
                        logOut
                                .logoutUrl("/logout")
                                .clearAuthentication(true)
                                .invalidateHttpSession(true)
                                .deleteCookies("JSESSIONID","remember-me")
                                .addLogoutHandler(logoutHandler)
                                .logoutSuccessHandler((request, response, authentication) -> {
                                    SecurityContextHolder.clearContext();
                                })


                );
        return httpSecurity.build();
    }
}
