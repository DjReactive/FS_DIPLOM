<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit1f278a8a2d363df695cde130fdf35b03
{
    public static $prefixLengthsPsr4 = array (
        'N' => 
        array (
            'Nikita\\Src\\' => 11,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Nikita\\Src\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit1f278a8a2d363df695cde130fdf35b03::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit1f278a8a2d363df695cde130fdf35b03::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit1f278a8a2d363df695cde130fdf35b03::$classMap;

        }, null, ClassLoader::class);
    }
}
