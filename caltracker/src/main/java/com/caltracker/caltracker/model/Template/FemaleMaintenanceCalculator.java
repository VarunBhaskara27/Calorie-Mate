package com.caltracker.caltracker.model.Template;

import com.caltracker.caltracker.model.User;

public class FemaleMaintenanceCalculator extends UserMaintenanceCalculator{

    //MIFFLIN-ST JEOR EQUATION
    @Override
    Integer calculateBMR(User user) {
        double weightInKgs=user.getWeightInPounds()/2.2;
        double heightInCm=user.getWeightInPounds()*2.54;
        return (int) ((10*weightInKgs)+(6.25*heightInCm)-(5*user.getAge())-161);
    }
}
