angular.module('xposure', ['ui.router','ngFileUpload','ngAnimate']).directive('coverflow', function(){
    return{
        restrict: 'E',
        scope: {
            list: '=',
            delete: '&'
        },
        template:
        '<div class="coverflow">'+
            '<div class="coverflow__container">' +
                '<div class="coverflow__element" style="{{loadElementStyle($index)}}" ng-click="changeIndex($index)" ng-repeat="item in list">' +
                    '<h2  class="coverflow__title">{{ item.title }}</h2>' +
                    '<div class="coverflow__image">'+
                    '<button class="coverflowButton btn btn-danger" ng-click="delete({event: item.id})"><span class="glyphicon glyphicon-trash"></span></button>'+
                      `<div class="coverflowimg" ng-style="{'background-image': 'url(' + (item.eventimage || item.image) + ')'}">` +
                      '<div class="overlaybackgroundimagethingy">' +
                      '<div class="locationandtimeboxthingy">'+
                       '<div class="coverflowContainForHover">' +
                      '<div class="locationCoverflow">{{item.location}}</div>' +
                      "<div class='timedatecoverflow'>{{ item.starts || item.start | date: 'medium'}} TO {{ item.ends | date: 'medium'}}</div>"+
                      '<hr/>' +
                      '<div class="descriptonCoverflow">{{item.eventdescription || item.description }}</div>' +
                      '</div>' +
                     '</div>'+
                   '</div>'+
                   '</div>' +
                   '</div>'+
                '</div>' +
           '</div>' +
        '</div>',
        replace: true,
        link:function(scope, element, attrs)  {
                function listenToKeystrokes() {
                    // var e;
                    // angular.element(document).keydown(function(e) {
                    //     if (e.which === 37) {
                    //         goLeft();
                    //     } else if (e.which === 39) {
                    //         goRight();
                    //     }
                    //     scope.$apply();
                    // });
                }
                scope.coverflowItems = scope.list;
                function init() {
                    scope.index = parseInt(scope.coverflowItems.length / 2);
                    listenToKeystrokes();
                }
                init();
                // scope.delete = function(eventid){
                //   console.log('tried to delete', eventid)
                //   console.log(scope.deleteFunction());
                //   scope.deleteFunction(eventid);
                // }
                function getNonFocussedElementStyle(loc, i, multiplier) {
                    return "transform: translateX(" + String(loc * 40 -12 * multiplier) + "%) rotateY(" + String(loc * -90) +"deg) scale(.6); z-index: " + String(loc * multiplier);
                }
                function getFocussedElementStyle(i) {
                    return "transform: translateZ(0);";
                }
                function goLeft() {
                    if(scope.index !== 0) {
                        scope.index--;
                    }
                }
                function goRight() {
                    if(scope.index !== scope.coverflowItems.length - 1) {
                        scope.index++;
                    }
                }
                scope.changeIndex = function(i) {
                    scope.index = i;
                };
                scope.loadElementStyle = function(i) {
                    var multiplier = scope.index - i;
                    if(i < scope.index) {
                       return getNonFocussedElementStyle(-1, i, multiplier);
                    } else if (i === scope.index) {
                       return getFocussedElementStyle(i);
                    } else {
                       return getNonFocussedElementStyle(1, i, multiplier);
                    }
                };
            }
        }
    }
);
