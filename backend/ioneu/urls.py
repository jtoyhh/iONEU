from django.contrib import admin
from django.urls import path
from . import views

app_name = 'ioneu'

urlpatterns = [
    # 1. urls 생성
    path('main/wealfare/<str:hashtag>', views.WelfareCompany),
    # searching > 기업 > 기본 정책 3개 
    path('main/financePolicy', views.FinancePolicy),
    # searching > 기업 > 해시태그별 정책 3개
    path('main/Policy/<str:hashtag>', views.CompanyPolicy),
    # searching > 청년 > 기본 정책 3개
    path('main/youth/basic', views.SeoulPolicy),
    # searching > 청년 > 태그별 정책 3개
    path('main/youth/<str:hashtag>', views.YouthPolicy),
    # 기업 세부
    path('main/detail/<str:company>', views.CompanyInfo),
]
