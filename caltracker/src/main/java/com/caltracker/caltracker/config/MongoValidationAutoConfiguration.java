package com.caltracker.caltracker.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.mapping.event.ValidatingMongoEventListener;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;

//Code from https://github.com/marcus-j/spring-boot-starter-data-mongodb-validation/blob/master/src/main/java/de/marcusjanke/examples/mongodbvalidation/MongoValidationAutoConfiguration.java
//Helps in setting up Auto validation of MongoDB models
@Configuration
public class MongoValidationAutoConfiguration {

    @ConditionalOnMissingBean(LocalValidatorFactoryBean.class)
    @Bean
    public LocalValidatorFactoryBean localValidatorFactoryBean() {
        return new LocalValidatorFactoryBean();
    }

    @ConditionalOnMissingBean(ValidatingMongoEventListener.class)
    @Bean
    public ValidatingMongoEventListener validatingMongoEventListener(LocalValidatorFactoryBean localValidatorFactoryBean) {
        return new ValidatingMongoEventListener(localValidatorFactoryBean);
    }
}
