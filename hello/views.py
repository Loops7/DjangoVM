from django.shortcuts import render
from django.http import HttpResponse
import numpy as np
#import scipy
from sklearn.datasets import load_digits

def hey(request):
    digits = load_digits()
    X,y = digits.data, digits.target 
    y = y[20:60:4]
    return render(request, "hello/home.html", {'digits':y})

def space(request):
    return render(request,"hello/gravity.html")