from django.urls import path, include
from rest_framework import routers

from .views import CandidateView
from .views import RecruiterView

router = routers.DefaultRouter()
router.register(r'candidates', CandidateView, 'candidate')
router.register(r'recruiters', RecruiterView, 'recruiter')
urlpatterns = [
    path('', include(router.urls))
]
