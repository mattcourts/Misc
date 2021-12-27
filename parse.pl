#! /usr/bin/perl -w

# author: Matt Courts
# description: Scape local file portal to create database of school name, email, url
# version: 0.7


use strict;
use warnings;
use HTML::TagParser;

#vars
my $site = "URL"; #add url to search
my @schooltitle = "";
my @schoollink = "";
my @schoollocation = "";
my $file="";
my $counter = 0;
my $counter2 = 0;

# load data into school variables from website from each html file in web directory
foreach $file ( <filtered/*> ) {
  my $html = HTML::TagParser->new( $file );
  my @atag = $html->getElementsByTagName( "a" );
  foreach my $elem ( @atag ) {
      my $tagname = $elem->tagName;
      my $attr = $elem->attributes;
      my $text = $elem->innerText;
        foreach my $key ( sort keys %$attr ) {
          if ( $key =~ /href/ ) {

            $schoollink[$counter] = "$site$attr->{$key}\n";
          }
            
        }
    $schooltitle[$counter] = "$text";
    $counter++;
  }

  # clean data and mark that it has been done
  open(FILTERED, $file) || die "cannot open filtered file $!";
  while (<FILTERED>) {
  
    if ( $_ =~ /,/ && $_ =~ /<br \/>/ ) {
      my $stripped = substr($_, 0, -8);
        $schoollocation[$counter2] = "$stripped";
        $counter2++;
    }
  
  }
  close(FILTERED);
}

# create local file in csv format load formatted data.
my $maxcount = $#schoollink - 1;
my $counter3 = 0;
 open(CSVFILE, ">>mba_usa.txt") || die "can't read or write csv file #!";
 print CSVFILE "School Title;City;State;Link\n";
 while ( $counter3 <= $maxcount ) {
  print CSVFILE "$schooltitle[$counter3];$schoollocation[$counter3];$schoollink[$counter3]";
  $counter3++;
 }