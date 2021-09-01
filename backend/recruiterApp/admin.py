from django.contrib import admin

from .models import Candidate
from .models import Recruiter


# Register your models here.

class CandidateAdmin(admin.ModelAdmin):
    list = ('name', 'experience', 'profile')


class RecruiterAdmin(admin.ModelAdmin):
    list = ('username', 'password')


admin.site.register(Candidate, CandidateAdmin)
admin.site.register(Recruiter, RecruiterAdmin)
