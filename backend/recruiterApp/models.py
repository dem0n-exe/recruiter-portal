from django.db import models


# Create your models here.
class Candidate(models.Model):
    name = models.CharField(max_length=100)
    experience = models.IntegerField()
    profile = models.CharField(max_length=50)

    objects = models.Manager()

    def __str__(self):
        ret = "{0} for {1}".format(self.name, self.profile)
        return ret


class Recruiter(models.Model):
    username = models.CharField(max_length=100, primary_key=True)
    password = models.CharField(max_length=50)

    objects = models.Manager()

    def __str__(self):
        ret = self.username
        return ret
